import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import tailwindStyles from "../index.css?inline";

export function Feedback() {
  const [rating, setRating] = useState<number>(5);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSetRating = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      feedback: (form.elements.namedItem("feedback") as HTMLInputElement).value,
      rating,
    };

    setSubmitted(true);
    setIsSubmitting(false);
    console.log(formData);
  };

  return (
    <>
      <style>{tailwindStyles}</style>
      <div className="right-4 bottom-4 z-[1000] fixed widget">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="space-x-1 shadow-lg rounded-full hover:scale-105">
              <span>Feedback</span>
              <MessageIcon className="w-4 h-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="bg-card shadow- mb-2 p-4 w-full max-w-md widget">
            <style>{tailwindStyles}</style>
            {submitted && (
              <div>
                <h3 className="scroll-m-20 font-semibold text-2xl tracking-tight">
                  Thank you for your feedback!
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Your input is invaluable to us. We strive to continuously
                  improve our services and your feedback helps us achieve that.
                </p>
              </div>
            )}
            {!submitted && (
              <div>
                <form className="space-y-2" onSubmit={handleSubmitForm}>
                  <h3 className="scroll-m-20 font-semibold text-2xl tracking-tight">
                    Send us your feedback
                  </h3>
                  <div className="gap-2 grid grid-cols-2">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="johndoe@email.com" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="feedback">Feedback</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Your thoughts..."
                      className="h-[120px] resize-none scrollbar-thin scrollbar-webkit"
                    />
                  </div>

                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`cursor-pointer ${
                          rating > i
                            ? "fill-primary"
                            : "fill-muted stroke-muted-foreground"
                        }`}
                        onClick={() => handleSetRating(i + 1)}
                      />
                    ))}
                  </div>

                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </form>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function MessageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

export default Feedback;
