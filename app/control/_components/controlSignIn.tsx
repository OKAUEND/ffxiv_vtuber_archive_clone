'use client';

import { SignIn } from '@/_components/Sign';

export default function ControlSignIn() {
  return (
    <SignIn provider="github" param="?page=control&">
      Sig In
    </SignIn>
  );
}
