#!/usr/bin/env bash

FILES=$(grep -rl "from 'src/components/" src/auth/view)

for file in $FILES; do
  sed -i \
    -e "s|'src/components/form-head'|'src/auth/components/form-head'|g" \
    -e "s|'src/components/form-divider'|'src/auth/components/form-divider'|g" \
    -e "s|'src/components/form-socials'|'src/auth/components/form-socials'|g" \
    -e "s|'src/components/form-return-link'|'src/auth/components/form-return-link'|g" \
    -e "s|'src/components/form-resend-code'|'src/auth/components/form-resend-code'|g" \
    -e "s|'src/components/sign-up-terms'|'src/auth/components/sign-up-terms'|g" \
    "$file"
done

# Specific fix for sign-up and reset that have different import paths
sed -i -e "s|'src/components/form-head'|'src/auth/components/form-head'|g" src/auth/view/sign-up.tsx
sed -i -e "s|'src/components/form-socials'|'src/auth/components/form-socials'|g" src/auth/view/sign-up.tsx
sed -i -e "s|'src/components/form-divider'|'src/auth/components/form-divider'|g" src/auth/view/sign-up.tsx
sed -i -e "s|'src/components/sign-up-terms'|'src/auth/components/sign-up-terms'|g" src/auth/view/sign-up.tsx

sed -i -e "s|'src/components/form-head'|'src/auth/components/form-head'|g" src/auth/view/reset.tsx
sed -i -e "s|'src/components/form-return-link'|'src/auth/components/form-return-link'|g" src/auth/view/reset.tsx

sed -i -e "s|'src/components/form-head'|'src/auth/components/form-head'|g" src/auth/view/update.tsx
sed -i -e "s|'src/components/form-resend-code'|'src/auth/components/form-resend-code'|g" src/auth/view/update.tsx
sed -i -e "s|'src/components/form-return-link'|'src/auth/components/form-return-link'|g" src/auth/view/update.tsx

sed -i -e "s|'src/components/form-head'|'src/auth/components/form-head'|g" src/auth/view/verify.tsx
sed -i -e "s|'src/components/form-resend-code'|'src/auth/components/form-resend-code'|g" src/auth/view/verify.tsx
sed -i -e "s|'src/components/form-return-link'|'src/auth/components/form-return-link'|g" src/auth/view/verify.tsx

echo "Auth imports fixed."
