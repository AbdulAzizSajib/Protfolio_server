export declare const Role: {
    readonly OWNER: "OWNER";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const ProjectStatus: {
    readonly DRAFT: "DRAFT";
    readonly PUBLISHED: "PUBLISHED";
    readonly ARCHIVED: "ARCHIVED";
};
export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];
export declare const SkillGroup: {
    readonly FRONTEND: "FRONTEND";
    readonly BACKEND: "BACKEND";
    readonly DATABASE: "DATABASE";
    readonly DEVOPS: "DEVOPS";
    readonly DESIGN: "DESIGN";
    readonly MOBILE: "MOBILE";
    readonly OTHER: "OTHER";
};
export type SkillGroup = (typeof SkillGroup)[keyof typeof SkillGroup];
export declare const LocationType: {
    readonly REMOTE: "REMOTE";
    readonly ONSITE: "ONSITE";
    readonly HYBRID: "HYBRID";
};
export type LocationType = (typeof LocationType)[keyof typeof LocationType];
export declare const MessageStatus: {
    readonly UNREAD: "UNREAD";
    readonly READ: "READ";
    readonly REPLIED: "REPLIED";
    readonly ARCHIVED: "ARCHIVED";
    readonly SPAM: "SPAM";
};
export type MessageStatus = (typeof MessageStatus)[keyof typeof MessageStatus];
//# sourceMappingURL=enums.d.ts.map