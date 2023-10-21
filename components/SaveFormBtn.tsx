import { HiSaveAs } from "react-icons/hi";
import { Button } from "./ui/button";
import useDesigner from "./hooks/useDesigner";
import { UpdateFormContent } from "@/actions/form";
import { toast } from "./ui/use-toast";
import { useTransition } from "react";
import { id } from "date-fns/locale";
import { FaSpinner } from "react-icons/fa";

const SaveFormBtn = ({ id }: { id: number }) => {
    const { elements } = useDesigner();
    const [loading, startTransition] = useTransition();
    const updateFormContent = async () => {
        try {
            const jsonElements = JSON.stringify(elements);
            await UpdateFormContent(id, jsonElements);
            toast({
                title: "Form Saved",
                description: "Your form has been saved successfully.",
            });
        } catch (err) {
            toast({
                title: "Error",
                description: "Your form could not be saved.",
            });
        }
    };
    return (
        <Button
            variant={"outline"}
            className="gap-2"
            disabled={loading}
            onClick={() => {
                startTransition(updateFormContent);
            }}
        >
            <HiSaveAs className="h-4 w-4" />
            Save
            {loading && <FaSpinner className="animate-spin" />}
        </Button>
    );
};

export default SaveFormBtn;
