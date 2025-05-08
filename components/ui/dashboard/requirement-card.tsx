import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "../button";

interface Requirement {
  text: string;
  met: boolean;
  fixLink?: string;
}

interface RequirementListProps {
  requirements: Requirement[];
}

export function RequirementList({ requirements }: RequirementListProps) {
  return (
    <div className="space-y-4">
      {requirements.map((req, index) => (
        <div
          key={index}
          className="flex flex-wrap items-center justify-between gap-5 rounded-lg border bg-muted p-4 transition-colors hover:bg-accent"
        >
          <div className="flex items-center gap-3">
            {req.met ? (
              <CheckCircle className="text-primary" size={24} />
            ) : (
              <XCircle className="text-destructive" size={24} />
            )}
            <div>
              <p className="font-medium">{req.text}</p>
              {!req.met && req.fixLink && (
                <Link
                  href={req.fixLink}
                  className="text-sm text-primary underline hover:opacity-80"
                >
                  Fix this requirement
                </Link>
              )}
            </div>
          </div>
          <Badge variant={req.met ? "default" : "destructive"}>
            {req.met ? "Met" : "Not Met"}
          </Badge>
        </div>
      ))}
    </div>
  );
}

export function RequirementCard({
  requirements,
  title,
  details,
  buttonText
}: {
  requirements: Requirement[];
  title: string;
  details: string;
  buttonText:string;
}) {
  return (
    <Card className="border-primary">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {details}
        </p>
        <RequirementList requirements={requirements} />
        <Button className="mt-4" disabled>
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
