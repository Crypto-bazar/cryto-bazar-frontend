import { verifySignature } from 'entities/signature/lib';
import { SignatureRequest, SignatureResponse } from 'entities/signature/model';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { message, signature, expectedAddress }: SignatureRequest = await req.json();

    if (!message || !signature || !expectedAddress) {
      return NextResponse.json({ error: 'Отсутствуют обязательные параметры' }, { status: 400 });
    }

    const { isValid, recoveredAddress }: SignatureResponse = await verifySignature(message, signature, expectedAddress);

    return NextResponse.json({ isValid, recoveredAddress });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Ошибка сервера', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Неизвестная ошибка' }, { status: 500 });
  }
}
