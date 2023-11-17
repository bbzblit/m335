import { createAction, props } from "@ngrx/store"

export const addNotification = createAction(
    '[Col] adding Notification to collection',
    props<{desc: string, isError: boolean}>()
);