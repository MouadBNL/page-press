import { Selector } from "@pagepress/core";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@pagepress/ui/lib/utils";
import { IconBackspace, IconChevronDown, IconCircleCheck, IconCircleDotted, IconCodeAsterisk } from "@tabler/icons-react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@pagepress/ui/components/dropdown-menu";


const selectorBadgeVariants = cva(
	"rounded-xs px-2 py-1 text-sm text-white",
	{
		variants: {
			type: {
				id: "bg-fuchsia-600",
				class: "bg-blue-600",
				style: "bg-background text-foreground",
			},
			active: {
				true: "opacity-100",
				false: "opacity-50",
			},
		},
	},
);


export type SelectorBadgeProps = {
	selector: Selector;
	onRemove?: () => void;
	onDisable?: () => void;
	onEnable?: () => void;
}
export function SelectorBadge({ selector, onRemove, onDisable, onEnable }: SelectorBadgeProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SelectorBadgeContainer type={selector.type} active={selector.active} className="group relative">

					{selector.active ? (
						<IconCircleCheck className="size-3.5" />
					) : (
						<IconCircleDotted className="size-3.5" />
					)}
					<span className="text-xs">
						{selector.label}
					</span>

					<span className={cn("absolute top-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100", selectorBadgeVariants({ type:selector.type}))}>
						<IconChevronDown className="size-4" />
					</span>
				</SelectorBadgeContainer>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{selector.active ? (
					<DropdownMenuItem onSelect={onDisable}>
						<IconCircleDotted className="size-3.5" />
						Disable
					</DropdownMenuItem>
				) : (
					<DropdownMenuItem onSelect={onEnable}>	
						<IconCircleCheck className="size-3.5" />
						Enable
					</DropdownMenuItem>
				)}
				<DropdownMenuItem onSelect={onRemove}>
					<IconBackspace />
						Remove
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}


export function SelectorStyleBadge() {
	return (
		<SelectorBadgeContainer type="style" active={true}>
			<span className="text-xs">
				<IconCodeAsterisk className="size-4" />
			</span>
		</SelectorBadgeContainer>
	)
}


type Props = React.ComponentProps<"div"> & {
	type: VariantProps<typeof selectorBadgeVariants>["type"];
	active: VariantProps<typeof selectorBadgeVariants>["active"];
};
function SelectorBadgeContainer({ type, active, className, ...props }: Props) {
	return (
		<div className={cn("flex items-center gap-1", selectorBadgeVariants({ type }), className)} {...props} />
	)

}