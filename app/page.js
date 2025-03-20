import IPhoneNotchNavbar from "@/components/navbar/IPhoneNotchNavbar";

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <IPhoneNotchNavbar />
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center h-screen pt-20">
                <h1 className="text-white text-4xl">Welcome to My Portfolio</h1>
            </div>
        </div>
    );
}
