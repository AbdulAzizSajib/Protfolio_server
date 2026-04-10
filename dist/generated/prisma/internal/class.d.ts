import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
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
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
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
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.user`: Exposes CRUD operations for the **User** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Users
  * const users = await prisma.user.findMany()
  * ```
  */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.session`: Exposes CRUD operations for the **Session** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Sessions
      * const sessions = await prisma.session.findMany()
      * ```
      */
    get session(): Prisma.SessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.account`: Exposes CRUD operations for the **Account** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Accounts
      * const accounts = await prisma.account.findMany()
      * ```
      */
    get account(): Prisma.AccountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Verifications
      * const verifications = await prisma.verification.findMany()
      * ```
      */
    get verification(): Prisma.VerificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Profiles
      * const profiles = await prisma.profile.findMany()
      * ```
      */
    get profile(): Prisma.ProfileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.about`: Exposes CRUD operations for the **About** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Abouts
      * const abouts = await prisma.about.findMany()
      * ```
      */
    get about(): Prisma.AboutDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.project`: Exposes CRUD operations for the **Project** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Projects
      * const projects = await prisma.project.findMany()
      * ```
      */
    get project(): Prisma.ProjectDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.projectImage`: Exposes CRUD operations for the **ProjectImage** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ProjectImages
      * const projectImages = await prisma.projectImage.findMany()
      * ```
      */
    get projectImage(): Prisma.ProjectImageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.category`: Exposes CRUD operations for the **Category** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Categories
      * const categories = await prisma.category.findMany()
      * ```
      */
    get category(): Prisma.CategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Tags
      * const tags = await prisma.tag.findMany()
      * ```
      */
    get tag(): Prisma.TagDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.projectTag`: Exposes CRUD operations for the **ProjectTag** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ProjectTags
      * const projectTags = await prisma.projectTag.findMany()
      * ```
      */
    get projectTag(): Prisma.ProjectTagDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.skill`: Exposes CRUD operations for the **Skill** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Skills
      * const skills = await prisma.skill.findMany()
      * ```
      */
    get skill(): Prisma.SkillDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.projectSkill`: Exposes CRUD operations for the **ProjectSkill** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ProjectSkills
      * const projectSkills = await prisma.projectSkill.findMany()
      * ```
      */
    get projectSkill(): Prisma.ProjectSkillDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.experience`: Exposes CRUD operations for the **Experience** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Experiences
      * const experiences = await prisma.experience.findMany()
      * ```
      */
    get experience(): Prisma.ExperienceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.education`: Exposes CRUD operations for the **Education** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Educations
      * const educations = await prisma.education.findMany()
      * ```
      */
    get education(): Prisma.EducationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.certification`: Exposes CRUD operations for the **Certification** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Certifications
      * const certifications = await prisma.certification.findMany()
      * ```
      */
    get certification(): Prisma.CertificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.post`: Exposes CRUD operations for the **Post** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Posts
      * const posts = await prisma.post.findMany()
      * ```
      */
    get post(): Prisma.PostDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.postTag`: Exposes CRUD operations for the **PostTag** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PostTags
      * const postTags = await prisma.postTag.findMany()
      * ```
      */
    get postTag(): Prisma.PostTagDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.testimonial`: Exposes CRUD operations for the **Testimonial** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Testimonials
      * const testimonials = await prisma.testimonial.findMany()
      * ```
      */
    get testimonial(): Prisma.TestimonialDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.contactMessage`: Exposes CRUD operations for the **ContactMessage** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ContactMessages
      * const contactMessages = await prisma.contactMessage.findMany()
      * ```
      */
    get contactMessage(): Prisma.ContactMessageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.pageView`: Exposes CRUD operations for the **PageView** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PageViews
      * const pageViews = await prisma.pageView.findMany()
      * ```
      */
    get pageView(): Prisma.PageViewDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map