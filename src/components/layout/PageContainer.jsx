import cx from "@/utils/cx";

function PageContainer({ children, className }) {
  return <main id="main-content" className={cx("mx-auto max-w-7xl px-4 py-8 md:py-12", className)}>{children}</main>;
}

export default PageContainer;
