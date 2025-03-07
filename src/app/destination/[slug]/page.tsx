import React from "react";

interface DestinationPageProps {
  params: { slug: string };
}

const DestinationPage: React.FC<DestinationPageProps> = ({ params }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome to {decodeURIComponent(params.slug)}
      </h1>
    </div>
  );
};

export default DestinationPage;
