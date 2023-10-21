import React, { startTransition, useTransition } from "react";
import { Button } from "./ui/button";
import { MdOutlinePublish } from "react-icons/md";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "./ui/alert-dialog";
import { FaIcons } from "react-icons/fa";
import { toast } from "./ui/use-toast";
import { PublishForm } from "@/actions/form";
import { useRouter } from "next/navigation";

const PublishFormBtn = ({ id }: { id: number }) => {
    const [loading, startTransition] = useTransition();
    const router = useRouter();
    async function publishForm() {
        try {
            await PublishForm(id);
            toast({
                title: "Success",
                description: "Form published successfully.",
            });
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again later.",
            });
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
                    <MdOutlinePublish className="h-4 w-4" />
                    Publish
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTitle>
                    Are you sure you want to publish this form?
                </AlertDialogTitle>
                <AlertDialogHeader>
                    <AlertDialogDescription>
                        This action cannot be undone. After publishing, you will
                        not be able to edit this form. <br />
                        <br />
                        <span className="font-medium">
                            By publishing this form you will make it available
                            to the public.
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-gradient-to-r from-indigo-400 to-cyan-400"
                        disabled={loading}
                        onClick={(e) => {
                            e.preventDefault();
                            startTransition(publishForm);
                        }}
                    >
                        Proceed{" "}
                        {loading && <FaIcons className="animate-spin" />}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default PublishFormBtn;
