/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Languages = "languages",
	Paradigms = "paradigms",
	Typings = "typings",
	Usages = "usages",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type LanguagesRecord = {
	creator?: string
	icon: string
	name: string
	order_id?: number
	paradigms?: RecordIdString[]
	release_year?: number
	typing?: RecordIdString
	usages?: RecordIdString[]
}

export type ParadigmsRecord = {
	name?: string
}

export type TypingsRecord = {
	name?: string
}

export type UsagesRecord = {
	name?: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type LanguagesResponse<Texpand = unknown> = Required<LanguagesRecord> & BaseSystemFields<Texpand>
export type ParadigmsResponse<Texpand = unknown> = Required<ParadigmsRecord> & BaseSystemFields<Texpand>
export type TypingsResponse<Texpand = unknown> = Required<TypingsRecord> & BaseSystemFields<Texpand>
export type UsagesResponse<Texpand = unknown> = Required<UsagesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	languages: LanguagesRecord
	paradigms: ParadigmsRecord
	typings: TypingsRecord
	usages: UsagesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	languages: LanguagesResponse
	paradigms: ParadigmsResponse
	typings: TypingsResponse
	usages: UsagesResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'languages'): RecordService<LanguagesResponse>
	collection(idOrName: 'paradigms'): RecordService<ParadigmsResponse>
	collection(idOrName: 'typings'): RecordService<TypingsResponse>
	collection(idOrName: 'usages'): RecordService<UsagesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
