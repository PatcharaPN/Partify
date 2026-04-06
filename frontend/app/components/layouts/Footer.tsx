export default function Footer() {
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="grid grid-cols-4 w-full max-w-350 mx-auto px-2 py-20 gap-5">
        <div>
          <h3 className="text-lg font-bold mb-10">Partify</h3>
          <p className="w-72 text-neutral-500">
            The Professional Curator of Part-Time Work. We believe in quality
            employment, regardless of the hours worked.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-10">Company</h3>
          <ul className="text-neutral-500 gap-5 flex flex-col">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-10">Resource</h3>
          <ul className="text-neutral-500 gap-5 flex flex-col">
            <li>Job Board</li>
            <li>Career Tips</li>
            <li>Hire Guide</li>
          </ul>
        </div>
        <div>
          {" "}
          <h3 className="text-lg font-bold mb-10">Legal</h3>
          <ul className="text-neutral-500 gap-5 flex flex-col">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>
      <div className="w-full max-w-350 h-[0.1] bg-neutral-400 mb-10"></div>

      <div className="flex justify-start items-start w-full max-w-350 gap-20">
        <p className="mb-10">
          © 2024 Partify. The Professional Curator of Part-Time Work.
        </p>
      </div>
    </div>
  );
}
