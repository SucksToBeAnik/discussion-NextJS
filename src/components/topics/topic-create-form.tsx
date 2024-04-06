"use client";

import * as actions from "@/actions";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import FormButton from "../common/form-button";

const TopicCreateForm = () => {
  const [formState, action] = useFormState(actions.createTopic, { errors: {} });

  const nameError = (
    <div className="text-red-400">{formState.errors.name?.join(", ")}</div>
  );
  const descriptionError = (
    <div className="text-red-400">
      {formState.errors.description?.join(", ")}
    </div>
  );

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button color="primary" size="md">
          Create a Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-2">
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg text-center">New Topic</h3>
            <Input
              label="Name"
              name="name"
              labelPlacement="inside"
              errorMessage={nameError}
            />
            <Textarea
              label="description"
              name="description"
              labelPlacement="inside"
              errorMessage={descriptionError}
            />
            {formState.errors._form && (
              <p className="text-red-400 text-sm">
                {formState.errors._form.join(", ")}
              </p>
            )}
            <FormButton>
              Save
            </FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default TopicCreateForm;
