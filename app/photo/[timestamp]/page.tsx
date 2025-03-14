import Image from 'next/image';


interface PageProps {
  params: {
    timestamp: string; // Define the type of the dynamic segment
  };
}

export default function Page({ params }: PageProps) {    const {timestamp} = params;

  if (!timestamp) {
    return <p>Loading...</p>;
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
<Image src="/1741938558354.png" alt="Holi Celebration" width={640} height={480} />    </div>
  );
};

