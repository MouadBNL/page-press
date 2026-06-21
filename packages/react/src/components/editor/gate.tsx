import { Suspense } from "react";




type Props = React.PropsWithChildren<{
	fallback?: React.ReactNode | null
}>;
export function EditorGate({children, fallback=null}: Props) {


	return (
		<Suspense fallback={fallback}>
			{children}
		</Suspense>
	)
}