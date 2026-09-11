import { Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 font-display text-5xl text-white">Page Not Found</h1>
      <p className="mt-4 max-w-md text-mist-300">
        The page you&rsquo;re looking for may have moved or no longer exists.
      </p>
      <div className="mt-8">
        <Button href="/">Back to Home</Button>
      </div>
    </Container>
  );
}
