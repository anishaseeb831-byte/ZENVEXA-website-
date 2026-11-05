# ZENVEXA Digital Agency — Firestore Security Specification (`security_spec.md`)

## 1. Data Invariants

1. **Default-Deny Catch-All**: Every path not explicitly matched is unconditionally denied (`allow read, write: if false;`).
2. **Verified Authentication & Admin Anti-Spoofing**: All standard authenticated writes require `request.auth != null && request.auth.token.email_verified == true`. Bootstrapped admin privileges (`zenvexahub@gmail.com`) are granted **only** when `request.auth.token.email_verified == true` is also satisfied, or when a trusted `/admins/{uid}` document exists.
3. **PII Isolation on Inquiries (`/inquiries/{inquiryId}`)**: Inquiry documents contain client PII (`email`, `fullName`, `businessName`). Read (`get` and `list`) access is strictly restricted to the owning client (`resource.data.clientId == request.auth.uid`) or a verified ZENVEXA admin. Clients must create inquiries with `clientId == request.auth.uid`, `status == 'new'`, `agencyNote == ''`, and `createdAt == request.time`. Once `status == 'completed'`, non-admin updates are locked permanently (Terminal State Locking).
4. **Admin-Only Portfolio Publishing (`/portfolioProjects/{projectId}`)**: Only verified ZENVEXA admins can create, update, or delete portfolio projects. Public `get` and `list` queries are enforced server-side via `resource.data.visibility == 'published'`, preventing scraping of `'draft'` projects without using blanket `if true` permissions.
5. **Moderated, PII-Free Testimonials (`/testimonials/{testimonialId}`)**: Testimonials store zero PII (no email or phone fields allowed via `.keys().hasOnly(...)`). Verified clients may create a testimonial strictly with `authorId == request.auth.uid` and `status == 'pending'`. Only verified admins can transition `status` to `'approved'` or `'rejected'`. Once moderated (`status != 'pending'`), non-admin authors cannot modify or overwrite the testimonial.
6. **Zero DB Lookups Inside `allow list`**: No `get()` or `exists()` calls appear inside any `allow list` rule, preventing O(n) read-amplification attacks.

---

## 2. The "Dirty Dozen" Adversarial Payloads

1. **Payload 01 — Unauthenticated Inquiry Spam**: `auth = null` attempting `create` on `/inquiries/inq_1` -> `PERMISSION_DENIED`.
2. **Payload 02 — Unverified Email Spoof of Bootstrapped Admin**: `auth = { uid: 'attacker', token: { email: 'zenvexahub@gmail.com', email_verified: false } }` attempting `list` or `get` on `/inquiries/victim_inq` -> `PERMISSION_DENIED`.
3. **Payload 03 — Identity Spoofing on Inquiry Creation**: Authenticated user `user_A` attempting `create` on `/inquiries/inq_2` with `clientId: 'user_B'` -> `PERMISSION_DENIED`.
4. **Payload 04 — Cross-Tenant PII Read Leak**: Authenticated verified user `user_B` attempting `get` or `list` on `/inquiries/inq_owned_by_A` -> `PERMISSION_DENIED`.
5. **Payload 05 — Shadow Ghost Field Injection**: Verified user `user_A` creating `/inquiries/inq_3` with all valid fields plus `"isPriorityAdmin": true` -> `PERMISSION_DENIED` (`hasOnly` rejection).
6. **Payload 06 — Client Pre-Approving Own Testimonial (State Shortcutting)**: Verified user `user_A` creating `/testimonials/rev_1` with `status: 'approved'` instead of `'pending'` -> `PERMISSION_DENIED`.
7. **Payload 07 — Post-Approval Testimonial Tampering (Terminal State Bypass)**: Verified author `user_A` attempting `update` on `/testimonials/rev_approved` after `existing().status == 'approved'` -> `PERMISSION_DENIED`.
8. **Payload 08 — Client Modifying `agencyNote` or Terminal `'completed'` Inquiry**: Verified client `user_A` attempting `update` on `/inquiries/inq_1` to alter `agencyNote` or mutate a `'completed'` inquiry -> `PERMISSION_DENIED`.
9. **Payload 09 — ID Poisoning Attack**: Verified user attempting `create` on `/inquiries/bad$id!with spaces` or >128-char ID -> `PERMISSION_DENIED` (`isValidId` guard).
10. **Payload 10 — Value / Resource Exhaustion Poisoning**: Verified user attempting `update` on `/inquiries/inq_1` with a 50,000-character `message` or boolean `message: true` -> `PERMISSION_DENIED` (`isValidInquiry` wrapper in `update`).
11. **Payload 11 — Client-Forged Past/Future Timestamp**: Verified user creating `/inquiries/inq_4` with `createdAt: Timestamp(2020-01-01)` instead of `request.time` -> `PERMISSION_DENIED`.
12. **Payload 12 — Scraping Unpublished Draft Portfolio Projects**: Unauthenticated or non-admin user attempting `get` or unfiltered `list` on `/portfolioProjects/draft_proj` where `visibility == 'draft'` -> `PERMISSION_DENIED`.
