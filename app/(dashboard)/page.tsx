import { GetFormStats, GetForms } from "@/actions/form";
import CreateFormBtn from "@/components/CreateFormBtn";
import { FormCard } from "@/components/FormCard";
import StatsCard from "@/components/StatsCard";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { LuView } from "react-icons/lu";
import { TbArrowBounce } from "react-icons/tb";

export default function Home() {
    return (
        <div className="container pt-4">
            <Suspense fallback={<StatsCards loading={true} />}>
                <CardStatsWrapper />
            </Suspense>
            <Separator className="my-6" />
            <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
            <Separator className="my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CreateFormBtn />
                <Suspense
                    fallback={[1, 2, 3, 4].map((el) => (
                        <FormCardSkeleton key={el} />
                    ))}
                >
                    <FormCards />
                </Suspense>
            </div>
        </div>
    );
}

async function CardStatsWrapper() {
    const stats = await GetFormStats();
    return <StatsCards loading={false} data={stats} />;
}

interface StatsCardsProps {
    data?: Awaited<ReturnType<typeof GetFormStats>>;
    loading: boolean;
}
function StatsCards(props: StatsCardsProps) {
    const { data, loading } = props;
    return (
        <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title="Total visits"
                icon={<LuView className="text-blue-600 " />}
                helperText="Total visits to your forms"
                value={data?.visits.toLocaleString() || ""}
                loading={loading}
                className="shadow-md shadow-blue-600"
            />
            <StatsCard
                title="Total submissions"
                icon={<FaWpforms className="text-yellow-600 " />}
                helperText="Total submissions to your forms"
                value={data?.submissions.toLocaleString() || ""}
                loading={loading}
                className="shadow-md shadow-yellow-600"
            />
            <StatsCard
                title="Submission Rate"
                icon={<HiCursorClick className="text-green-600 " />}
                helperText="Visits that resulted in a submission"
                value={data?.submissionRate.toLocaleString() + "%" || ""}
                loading={loading}
                className="shadow-md shadow-green-600"
            />
            <StatsCard
                title="Bounce Rate"
                icon={<TbArrowBounce className="text-red-600 " />}
                helperText="Visits that leave without submitting"
                value={data?.bounceRate.toLocaleString() + "%" || ""}
                loading={loading}
                className="shadow-md shadow-red-600"
            />
        </div>
    );
}

function FormCardSkeleton() {
    return (
        <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />
    );
}
async function FormCards() {
    const forms = await GetForms();
    return (
        <>
            {forms.map((form) => (
                <FormCard key={form.id} form={form} />
            ))}
        </>
    );
}
