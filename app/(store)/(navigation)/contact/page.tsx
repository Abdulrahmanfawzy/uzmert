import { Translate } from "@/components/translate";
import { parseSettings } from "@/utils/parse-settings";
import fetcher from "@/lib/fetcher";
import { DefaultResponse, Setting } from "@/types/global";
import { createMapUrl } from "@/utils/create-map-url";

const ContactsPage = async () => {
  const settings = await fetcher<DefaultResponse<Setting[]>>("v1/rest/settings", {
    cache: "no-cache",
  }).then((res) => res.data);
  const parsedSettings = parseSettings(settings);
  const [lat, long] = parsedSettings.location.split(",");
  return (
    <section className="xl:container px-2 md:px-4">
      <h1 className="md:text-head text-xl font-medium my-6 ">
        <Translate value="contact" />
      </h1>
      <div className="flex flex-col gap-6 my-10">
        <a
          href={`tel:${parsedSettings?.phone}`}
          className="dm:text-xl text-lg font-medium"
          target="_blank"
          rel="noreferrer"
        >
          {parsedSettings?.phone}
        </a>
        <a
          className="md:text-lg text-base font-simibold"
          href={createMapUrl(lat.trim(), long.trim())}
        >
          {parsedSettings?.address}
        </a>
        <p className="md:text-base text-sm">{parsedSettings?.footer_text}</p>
      </div>
    </section>
  );
};

export default ContactsPage;
