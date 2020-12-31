import {trigger,state,transition,style,animate} from "@angular/animations"

export const slideFromLeft = trigger("slideFromLeft",[
    state("void",style({
        transform:"translateX(-100px)",
        opacity:0
    })),
    transition("void<=>*",[
        animate("0.5s")
    ]),
])

export const slideFromRight = trigger("slideFromRight",[
    state("void",style({
        transform:"translateX(100px)",
        opacity:0
    })),
    transition("void<=>*",[
        animate("0.5s")
    ]),
])