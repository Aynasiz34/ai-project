import { auth, redirectToSignIn } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import CompanionForm from "./components/companion-form";

interface CompanionIdProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdProps) => {
  const { userId } = auth();
  //Todo check subscription

  if (!userId) return redirectToSignIn();

  const companion = await prismadb.companion.findUnique({
    where: {
      userId,
      id: params.companionId,
    },
  });

  const categories = await prismadb.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
