import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Session: "Session";
    readonly Account: "Account";
    readonly Verification: "Verification";
    readonly Profile: "Profile";
    readonly About: "About";
    readonly Project: "Project";
    readonly ProjectImage: "ProjectImage";
    readonly Category: "Category";
    readonly Tag: "Tag";
    readonly ProjectTag: "ProjectTag";
    readonly Skill: "Skill";
    readonly ProjectSkill: "ProjectSkill";
    readonly Experience: "Experience";
    readonly Education: "Education";
    readonly Certification: "Certification";
    readonly Post: "Post";
    readonly PostTag: "PostTag";
    readonly Testimonial: "Testimonial";
    readonly ContactMessage: "ContactMessage";
    readonly PageView: "PageView";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly emailVerified: "emailVerified";
    readonly image: "image";
    readonly phone: "phone";
    readonly password: "password";
    readonly role: "role";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly expiresAt: "expiresAt";
    readonly token: "token";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly userId: "userId";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const AccountScalarFieldEnum: {
    readonly id: "id";
    readonly accountId: "accountId";
    readonly providerId: "providerId";
    readonly userId: "userId";
    readonly accessToken: "accessToken";
    readonly refreshToken: "refreshToken";
    readonly idToken: "idToken";
    readonly accessTokenExpiresAt: "accessTokenExpiresAt";
    readonly refreshTokenExpiresAt: "refreshTokenExpiresAt";
    readonly scope: "scope";
    readonly password: "password";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];
export declare const VerificationScalarFieldEnum: {
    readonly id: "id";
    readonly identifier: "identifier";
    readonly value: "value";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum];
export declare const ProfileScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tagline: "tagline";
    readonly bio: "bio";
    readonly avatarUrl: "avatarUrl";
    readonly resumeUrl: "resumeUrl";
    readonly location: "location";
    readonly website: "website";
    readonly available: "available";
    readonly github: "github";
    readonly linkedin: "linkedin";
    readonly twitter: "twitter";
    readonly youtube: "youtube";
    readonly dribbble: "dribbble";
    readonly behance: "behance";
    readonly metaTitle: "metaTitle";
    readonly metaDescription: "metaDescription";
};
export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum];
export declare const AboutScalarFieldEnum: {
    readonly id: "id";
    readonly key: "key";
    readonly title: "title";
    readonly subtitle: "subtitle";
    readonly description: "description";
    readonly yearsOfExperience: "yearsOfExperience";
    readonly projectsCompleted: "projectsCompleted";
    readonly clientsWorkedWith: "clientsWorkedWith";
    readonly imageUrl: "imageUrl";
    readonly resumeUrl: "resumeUrl";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AboutScalarFieldEnum = (typeof AboutScalarFieldEnum)[keyof typeof AboutScalarFieldEnum];
export declare const ProjectScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly slug: "slug";
    readonly description: "description";
    readonly content: "content";
    readonly coverImage: "coverImage";
    readonly liveUrl: "liveUrl";
    readonly githubUrl: "githubUrl";
    readonly featured: "featured";
    readonly status: "status";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly sortOrder: "sortOrder";
    readonly viewCount: "viewCount";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly categoryId: "categoryId";
};
export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum];
export declare const ProjectImageScalarFieldEnum: {
    readonly id: "id";
    readonly url: "url";
    readonly alt: "alt";
    readonly sortOrder: "sortOrder";
    readonly projectId: "projectId";
};
export type ProjectImageScalarFieldEnum = (typeof ProjectImageScalarFieldEnum)[keyof typeof ProjectImageScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly description: "description";
    readonly color: "color";
    readonly icon: "icon";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const TagScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
};
export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum];
export declare const ProjectTagScalarFieldEnum: {
    readonly projectId: "projectId";
    readonly tagId: "tagId";
};
export type ProjectTagScalarFieldEnum = (typeof ProjectTagScalarFieldEnum)[keyof typeof ProjectTagScalarFieldEnum];
export declare const SkillScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly iconUrl: "iconUrl";
    readonly proficiency: "proficiency";
    readonly category: "category";
    readonly sortOrder: "sortOrder";
    readonly featured: "featured";
};
export type SkillScalarFieldEnum = (typeof SkillScalarFieldEnum)[keyof typeof SkillScalarFieldEnum];
export declare const ProjectSkillScalarFieldEnum: {
    readonly projectId: "projectId";
    readonly skillId: "skillId";
};
export type ProjectSkillScalarFieldEnum = (typeof ProjectSkillScalarFieldEnum)[keyof typeof ProjectSkillScalarFieldEnum];
export declare const ExperienceScalarFieldEnum: {
    readonly id: "id";
    readonly company: "company";
    readonly role: "role";
    readonly description: "description";
    readonly logoUrl: "logoUrl";
    readonly companyUrl: "companyUrl";
    readonly employmentType: "employmentType";
    readonly locationType: "locationType";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly current: "current";
    readonly sortOrder: "sortOrder";
};
export type ExperienceScalarFieldEnum = (typeof ExperienceScalarFieldEnum)[keyof typeof ExperienceScalarFieldEnum];
export declare const EducationScalarFieldEnum: {
    readonly id: "id";
    readonly institution: "institution";
    readonly degree: "degree";
    readonly field: "field";
    readonly logoUrl: "logoUrl";
    readonly grade: "grade";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly current: "current";
    readonly description: "description";
};
export type EducationScalarFieldEnum = (typeof EducationScalarFieldEnum)[keyof typeof EducationScalarFieldEnum];
export declare const CertificationScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly issuer: "issuer";
    readonly issueDate: "issueDate";
    readonly expiryDate: "expiryDate";
    readonly credentialId: "credentialId";
    readonly credentialUrl: "credentialUrl";
    readonly badgeUrl: "badgeUrl";
};
export type CertificationScalarFieldEnum = (typeof CertificationScalarFieldEnum)[keyof typeof CertificationScalarFieldEnum];
export declare const PostScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly slug: "slug";
    readonly excerpt: "excerpt";
    readonly content: "content";
    readonly coverImage: "coverImage";
    readonly published: "published";
    readonly featured: "featured";
    readonly readingTime: "readingTime";
    readonly viewCount: "viewCount";
    readonly publishedAt: "publishedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum];
export declare const PostTagScalarFieldEnum: {
    readonly postId: "postId";
    readonly tagId: "tagId";
};
export type PostTagScalarFieldEnum = (typeof PostTagScalarFieldEnum)[keyof typeof PostTagScalarFieldEnum];
export declare const TestimonialScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly role: "role";
    readonly company: "company";
    readonly avatarUrl: "avatarUrl";
    readonly content: "content";
    readonly rating: "rating";
    readonly featured: "featured";
    readonly approved: "approved";
    readonly createdAt: "createdAt";
    readonly projectId: "projectId";
};
export type TestimonialScalarFieldEnum = (typeof TestimonialScalarFieldEnum)[keyof typeof TestimonialScalarFieldEnum];
export declare const ContactMessageScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly subject: "subject";
    readonly message: "message";
    readonly status: "status";
    readonly ip: "ip";
    readonly createdAt: "createdAt";
    readonly readAt: "readAt";
    readonly repliedAt: "repliedAt";
};
export type ContactMessageScalarFieldEnum = (typeof ContactMessageScalarFieldEnum)[keyof typeof ContactMessageScalarFieldEnum];
export declare const PageViewScalarFieldEnum: {
    readonly id: "id";
    readonly path: "path";
    readonly referrer: "referrer";
    readonly userAgent: "userAgent";
    readonly ip: "ip";
    readonly country: "country";
    readonly eventType: "eventType";
    readonly section: "section";
    readonly createdAt: "createdAt";
};
export type PageViewScalarFieldEnum = (typeof PageViewScalarFieldEnum)[keyof typeof PageViewScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map