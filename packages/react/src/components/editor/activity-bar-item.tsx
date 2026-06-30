import { cn } from "@pagepress/ui/lib/utils";


type Props = React.ComponentProps<"div"> & {
	id: string,
	label: string,
	icon: React.ReactNode,
};
export function ActivityBarItem({id, label, icon, className, ...props}: Props) {

	return <div className={cn("flex-1 lex-1 min-h-0 overflow-hidden flex flex-col h-full")} {...props} id={id}/>
}