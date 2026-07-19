import { Label } from "@pagepress/ui/components/label";
import { ComponentCreatePayload } from "../types";
import { Input } from "@pagepress/ui/components/input";
import { Textarea } from "@pagepress/ui/components/textarea";
import { Button } from "@pagepress/ui/components/button";
import { useRef } from "react";


type CreateComponentFormProps = {
	id?: string;
	onSubmit?: (payload: ComponentCreatePayload) => void;
	onCancel?: () => void;
}
export function CreateComponentForm({ id = 'create-component-form', onSubmit, onCancel }: CreateComponentFormProps) {

	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		// Vaidation
		if (!formData.get('name')) {
			console.error('Name is required');
			return;
		}

		const id = formData.get('id') as string;
		if (!id) {
			console.error('ID is required');
			return;
		}

		const payload = {
			name: formData.get('name') as string,
			id: formData.get('id') as string,
			group: formData.get('group') as string | null,
			description: formData.get('description') as string | null,
		}
		onSubmit?.(payload);
	}

	const handleCancel = () => {
		formRef.current?.reset();
		onCancel?.();
	}
	return (
		<form ref={formRef} id={id} onSubmit={handleSubmit} className="flex flex-col gap-3">
			<div className="flex flex-col gap-1">
				<Label htmlFor="name">Name</Label>
				<Input id="name" name="name" />
			</div>

			<div className="flex flex-col gap-1">
				<Label htmlFor="id">Unique ID</Label>
				<Input id="id" name="id" />
			</div>

			{/* <div className="flex flex-col gap-1">
				<Label htmlFor="group">Group</Label>
				<Input id="group" name="group" />
			</div> */}

			<div className="flex flex-col gap-1">
				<Label htmlFor="description">Description</Label>
				<Textarea id="description" name="description" />
			</div>

			<div className="flex justify-end gap-2">
				<Button size="sm" type="button" variant="outline" onClick={handleCancel}>
					Cancel
				</Button>

				<Button size="sm" type="submit">
				Create 
				</Button>
			</div>
		</form>
	)
}