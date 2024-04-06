"use client";

import { useFormState } from "react-dom";
import {
  Button,
  Input,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";

const PostCreateForm = () => {
  const [formState, action] = useFormState(actions.createPost, {
    errors: {},
  });
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button color="primary">Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 w-80 p-4">
            <h3 className="text-lg">Create a Post</h3>

            <Input isInvalid={!!formState.errors.title} errorMessage={formState.errors.title?.join(', ')} name="title" label="Title" labelPlacement="inside" />

            <Textarea isInvalid={!!formState.errors.content} errorMessage={formState.errors.content?.join(', ')} name="content" label="Content" labelPlacement="inside" />
            <FormButton>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default PostCreateForm;
