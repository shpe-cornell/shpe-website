export default function GreyQuoteBanner() {
  return (
    <div className="relative w-full h-auto flex items-center justify-center px-6">
      {/* Background Color Control -- grey as of now */}
      <div className="absolute inset-0 bg-gray-300 opacity-60 pointer-events-none"></div>

      {/* Quote */}
      <div className="relative w-full flex flex-col sm:flex-row items-center justify-between z-10 p-4">
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
          rel="stylesheet"
        />
        <div className="border-2 border-gray-800 pb-4 pt-2 pl-[50px]">
          <p
            className="text-gray-800 text-3xl font-semibold"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            “I gained more than just career skills—I became part of a supportive
            community, dedicated to helping others like me, including children
            of immigrants and first-generation college students.” - Juan Gomez
            ‘19
          </p>
        </div>
      </div>
    </div>
  );
}
