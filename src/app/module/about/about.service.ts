import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";

const ABOUT_KEY = "main";

const getPublicAbout = async () => {
  const about = await prisma.about.findUnique({ where: { key: ABOUT_KEY } });

  if (!about) {
    throw new AppError(status.NOT_FOUND, "About information not found");
  }

  return about;
};

// hello world

const upsertAbout = async (payload: Record<string, unknown>) => {
  const about = await prisma.about.upsert({
    where: { key: ABOUT_KEY },
    create: { key: ABOUT_KEY, ...payload } as never,
    update: payload as never,
  });

  return about;
};

export const aboutService = {
  getPublicAbout,
  upsertAbout,
};
