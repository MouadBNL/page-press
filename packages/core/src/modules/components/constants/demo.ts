import { EditorComponentDefinition } from "../types";



export const DemoComponent: EditorComponentDefinition = {
	id: 'room-card',
	label: 'Room Card',
	content: `
		<div class="room-card">
			<div class="room-card__image">
				<img src="https://via.placeholder.com/150" alt="Room Card">
			</div>
			<div class="room-card__content">
				<h3 class="room-card__title">Room Card</h3>
			</div>
		</div>
	`,
}