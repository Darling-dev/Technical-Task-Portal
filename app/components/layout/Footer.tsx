"use server";

const Footer: React.FC = () => {
  return (
    <footer className="border-t py-6 backdrop-blur md:px-8">
      <div className="flex flex-col items-center justify-center gap-4 px-4 text-center md:flex-row md:items-start md:gap-8 md:text-left">
        <p className="text-muted-foreground text-sm leading-relaxed md:leading-loose">
          Built by&nbsp;
          <a
            href="mailto:ovavova.rv@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="break-all font-medium underline underline-offset-4"
          >
            ovavova.rv@gmail.com
          </a>
          . The source code is available on&nbsp;
          <a
            href="https://github.com/Darling-dev/Technical-Task-Portal/"
            target="_blank"
            rel="noreferrer"
            className="break-all font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
