import { NextRequest, NextResponse } from 'next/server';
import { agentService } from '@/services/agentService';

export async function middleware(req: NextRequest) {
  // Only apply to API routes that require agent authentication
  if (req.nextUrl.pathname.startsWith('/api/conversations')) {
    const apiKey = req.headers.get('x-api-key');

    if (!apiKey) {
      return new NextResponse(JSON.stringify({ message: 'API Key missing' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const agent = await agentService.getAgentByApiKey(apiKey);

    if (!agent) {
      return new NextResponse(JSON.stringify({ message: 'Invalid API Key' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
    }

    // Optionally, attach agent info to the request for downstream handlers
    // For Next.js API routes, this is typically done by modifying the request object
    // However, in Edge Middleware, direct modification of req.json() is not standard.
    // A common pattern is to pass it via headers or context if needed in API routes.
    // For this example, we'll just validate and allow/deny.

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/conversations/:path*'],
};
