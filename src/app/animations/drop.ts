import {trigger,style,animate,transition,state} from '@angular/animations';

export const drop = trigger("drop",[
    state("void",style({
        transform:'translateY(-20px)',
        opacity:0
    })),
    transition("void<=>*",[
        animate("0.3s ease-in-out")
    ])
])