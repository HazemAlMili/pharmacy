import withNextIntl from "next-intl/plugin";

const withNextIntlConfig = withNextIntl("./next-intl.config.ts");

export default withNextIntlConfig({
  reactStrictMode: true,
});
