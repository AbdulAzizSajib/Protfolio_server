export declare const profileService: {
    getPublicProfile: () => Promise<{
        user: {
            name: string;
            id: string;
            image: string | null;
        };
    } & {
        id: string;
        userId: string;
        github: string | null;
        twitter: string | null;
        linkedin: string | null;
        tagline: string | null;
        bio: string | null;
        avatarUrl: string | null;
        resumeUrl: string | null;
        location: string | null;
        website: string | null;
        available: boolean;
        youtube: string | null;
        dribbble: string | null;
        behance: string | null;
        metaTitle: string | null;
        metaDescription: string | null;
    }>;
    getMyProfile: (userId: string) => Promise<{
        id: string;
        userId: string;
        github: string | null;
        twitter: string | null;
        linkedin: string | null;
        tagline: string | null;
        bio: string | null;
        avatarUrl: string | null;
        resumeUrl: string | null;
        location: string | null;
        website: string | null;
        available: boolean;
        youtube: string | null;
        dribbble: string | null;
        behance: string | null;
        metaTitle: string | null;
        metaDescription: string | null;
    }>;
    updateMyProfile: (userId: string, payload: Record<string, unknown>, file?: Express.Multer.File) => Promise<{
        id: string;
        userId: string;
        github: string | null;
        twitter: string | null;
        linkedin: string | null;
        tagline: string | null;
        bio: string | null;
        avatarUrl: string | null;
        resumeUrl: string | null;
        location: string | null;
        website: string | null;
        available: boolean;
        youtube: string | null;
        dribbble: string | null;
        behance: string | null;
        metaTitle: string | null;
        metaDescription: string | null;
    }>;
};
//# sourceMappingURL=profile.service.d.ts.map