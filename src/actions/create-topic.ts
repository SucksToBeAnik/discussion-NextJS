"use server";

import { Topic } from "@prisma/client";
import { auth } from "@/auth";
import { db } from "@/db";
import path from "@/path";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lower case letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const session = await auth();
  if (!session) {
    return {
      errors: {
        _form: ["You must be signed in to do this!"],
      },
    };
  }
  const name = formData.get("name");
  const description = formData.get("description");

  const result = createTopicSchema.safeParse({
    name,
    description,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  
  // after validation succeeded
  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { errors: { _form: [err.message] } };
    }else{
      return {
        errors:{
          _form:["Something went wrong!"]
        }
      }
    }
  }

  revalidatePath(path.home())
  redirect(path.topicShow(topic.slug));
}
