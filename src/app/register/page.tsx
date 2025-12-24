import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold font-headline text-primary">
          Register with SaudiDropship
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
          This form is for dropshippers to register for our dropshipping service.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="w-full h-[1000px] md:h-[850px] overflow-hidden">
           <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScDgl1fgnb6Ql3lqolCXrSnFJIxdEUwYqkNOYJLhyRrjZc3CA/viewform?embedded=true"
              width="100%"
              height="100%"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="w-full h-full border-none"
            >
              Loading…
            </iframe>
        </div>
      </div>
    </div>
  );
}
