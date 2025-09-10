import LandingTopbar from '@/components/Navigation/LandingTopbar';

export default function Landing() {
  return (
    <>
      <LandingTopbar />
      <div className="flex h-[150vh] w-full justify-center items-center">
        <p className="text-black text-3xl font-bold">
          Welcome to the Landing Page.
        </p>
      </div>
    </>
  );
}
