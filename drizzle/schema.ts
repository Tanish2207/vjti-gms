import { pgTable, integer, varchar, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const visitors = pgTable("visitors", {
	visitorId: integer("visitor_id").primaryKey().generatedAlwaysAsIdentity({ name: "visitors_visitor_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 100 }).notNull(),
	mobile: varchar({ length: 10 }),
});

export const staff = pgTable("staff", {
	staffId: integer("staff_id").primaryKey().generatedAlwaysAsIdentity({ name: "staff_staff_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 100 }).notNull(),
	mobile: varchar({ length: 10 }).notNull(),
});

export const keys = pgTable("keys", {
	keyId: integer("key_id").primaryKey().generatedAlwaysAsIdentity({ name: "keys_key_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	room: varchar({ length: 30 }).notNull(),
});

export const humanVisits = pgTable("human_visits", {
	visitId: integer("visit_id").primaryKey().generatedAlwaysAsIdentity({ name: "human_visits_visit_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	entryTime: timestamp("entry_time", { withTimezone: true, mode: 'string' }).defaultNow(),
	exitTime: timestamp("exit_time", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const vehicleVisits = pgTable("vehicle_visits", {
	vehicleId: integer("vehicle_id").primaryKey().generatedAlwaysAsIdentity({ name: "vehicle_visits_vehicle_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	entryTime: timestamp("entry_time", { withTimezone: true, mode: 'string' }).defaultNow(),
	exitTime: timestamp("exit_time", { withTimezone: true, mode: 'string' }).defaultNow(),
});
