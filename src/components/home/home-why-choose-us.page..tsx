import { Card, CardContent } from "@/components/ui/card";

export function HomeWhyChooseUsPage() {
  return (
    <section
      className="relative scroll-mt-28 bg-muted/40 px-6 py-20 lg:px-8 lg:py-28"
      id="why-us"
    >
      <Card className="mx-auto grid w-full grid-cols-1 gap-0 overflow-hidden p-0 md:grid-cols-2">
        <CardContent className="flex flex-col justify-center px-8 py-10 sm:px-10 lg:px-14 lg:py-14">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            ABOUT
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              We provides quality business solutions using Automatic
              Identification and Data Capture technology. ITRACK Solutions Inc.
              offers a diversified range of products to meet every requirements
              from barcode printers, barcode scanners, mobile computers, RFID
              solutions, CCTV, biometrics solutions, door access controllers,
              customized solutions, software solutions, thermal transfer
              ribbons, POS and consumables.
            </p>
            <p>
              We provide fast and efficient technical services to enable
              implementation of automatic identification and data capture
              technologies:
            </p>
            <p>
              We make sure that we give advanced and comprehensive AIDC
              solutions to maximize business efficiency within our customers'
              budgetary requirements.
            </p>
          </div>
        </CardContent>
        <div className="relative min-h-80 overflow-hidden bg-muted/30">
          <img
            src="/images/about-image.png"
            alt="About ITRACK Solutions"
            className="absolute inset-0 h-full w-full  "
          />
        </div>
      </Card>
    </section>
  );
}
