import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MessageService } from "src/app/service/message.service";
import { fetchAllMessages, fetchAllMessagesSuccess } from "./message.action";
import { catchError, from, map, mergeMap, of } from "rxjs";
import { Message } from "src/app/model/message.model";
import { addNotification } from "../notification/notification.action";

@Injectable()
export class MessageEffect {
    constructor(private actions$: Actions, private messageService: MessageService) { }

    getClasses$ = createEffect(() => this.actions$.pipe(
        ofType(fetchAllMessages),
        mergeMap(({chatId}) => from(this.messageService.getMessages(chatId)).pipe(
            map((data) => fetchAllMessagesSuccess({ messages: data as Array<Message> })),
            catchError(error => of(addNotification({ desc: "Someting went wrong requesting Appointments by the class id ", isError: true })))
        )
        )
    ))
};