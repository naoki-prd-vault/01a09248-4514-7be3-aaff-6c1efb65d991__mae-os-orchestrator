import { getProviders, signIn } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';

export default function SignIn({ providers }: { providers: any }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-6">Sign In to Mae Orchestrator</h1>
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name} className="mb-4">
            <button
              onClick={() => signIn(provider.id)}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
