import { Component } from "../../component.js";
import { div, input, label, p } from "../../../libs/html.js";

export class InputComponent extends Component {
    constructor(appManager, parent, labelMsj, placeholderMsj, errorMsj) {
        super(appManager, parent);
        this.container.className = 'inputComponent';

        this.label = label({ for: 'titleInput', innerHTML: labelMsj, className: 'inputComponent_label' }, this.container);
        this.input = input({ id: 'titleInput', type: 'text', name: 'titleInput', placeholder: placeholderMsj, className: 'inputComponent_input' }, this.container);
        this.error = p({ innerHTML: errorMsj, className: 'inputComponent_error' }, this.container);
        this.error.classList.add('hidden');
    }

    validate() {
        if (this.input.value === '') {
            this.error.classList.remove('hidden');
            this.input.classList.add('inputComponent_input_error');
            return false;
        }
        this.input.classList.remove('inputComponent_input_error');
        this.error.classList.add('hidden');
        return true;
    }

    value() {
        return this.input.value;
    }

    clean() {
        this.input.classList.remove('inputComponent_input_error');
        this.error.classList.add('hidden');
        this.input.value = '';
    }
}