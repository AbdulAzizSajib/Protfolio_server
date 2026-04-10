import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model Session
 *
 */
export type Session = Prisma.SessionModel;
/**
 * Model Account
 *
 */
export type Account = Prisma.AccountModel;
/**
 * Model Verification
 *
 */
export type Verification = Prisma.VerificationModel;
/**
 * Model Profile
 *
 */
export type Profile = Prisma.ProfileModel;
/**
 * Model About
 *
 */
export type About = Prisma.AboutModel;
/**
 * Model Project
 *
 */
export type Project = Prisma.ProjectModel;
/**
 * Model ProjectImage
 *
 */
export type ProjectImage = Prisma.ProjectImageModel;
/**
 * Model Category
 *
 */
export type Category = Prisma.CategoryModel;
/**
 * Model Tag
 *
 */
export type Tag = Prisma.TagModel;
/**
 * Model ProjectTag
 *
 */
export type ProjectTag = Prisma.ProjectTagModel;
/**
 * Model Skill
 *
 */
export type Skill = Prisma.SkillModel;
/**
 * Model ProjectSkill
 *
 */
export type ProjectSkill = Prisma.ProjectSkillModel;
/**
 * Model Experience
 *
 */
export type Experience = Prisma.ExperienceModel;
/**
 * Model Education
 *
 */
export type Education = Prisma.EducationModel;
/**
 * Model Certification
 *
 */
export type Certification = Prisma.CertificationModel;
/**
 * Model Post
 *
 */
export type Post = Prisma.PostModel;
/**
 * Model PostTag
 *
 */
export type PostTag = Prisma.PostTagModel;
/**
 * Model Testimonial
 *
 */
export type Testimonial = Prisma.TestimonialModel;
/**
 * Model ContactMessage
 *
 */
export type ContactMessage = Prisma.ContactMessageModel;
/**
 * Model PageView
 *
 */
export type PageView = Prisma.PageViewModel;
//# sourceMappingURL=client.d.ts.map