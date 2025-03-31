import { pgTable, unique, integer, varchar, foreignKey, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const visitors = pgTable("visitors", {
	visitorId: integer("visitor_id").primaryKey().generatedAlwaysAsIdentity({ name: "visitors_visitor_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 100 }).notNull(),
	mobile: varchar({ length: 10 }),
}, (table) => [
	unique("visitors_mobile_key").on(table.mobile),
]);

export const humanVisits = pgTable("human_visits", {
	visitId: integer("visit_id").generatedAlwaysAsIdentity({ name: "human_visits_visit_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	entryTime: timestamp("entry_time", { withTimezone: true, mode: 'string' }).defaultNow(),
	exitTime: timestamp("exit_time", { withTimezone: true, mode: 'string' }).defaultNow(),
	visitorId: integer("visitor_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.visitorId],
			foreignColumns: [visitors.visitorId],
			name: "hvisitors_visitors_fk"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const reasons = pgTable("reasons", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "reasons_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	reasonName: varchar("reason_name", { length: 30 }).notNull(),
});

export const staff = pgTable("staff", {
	staffId: integer("staff_id").primaryKey().generatedAlwaysAsIdentity({ name: "staff_staff_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 100 }).notNull(),
	mobile: varchar({ length: 10 }).notNull(),
}, (table) => [
	unique("staff_mobile_key").on(table.mobile),
]);

export const keys = pgTable("keys", {
	keyId: integer("key_id").primaryKey().generatedAlwaysAsIdentity({ name: "keys_key_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	room: varchar({ length: 30 }).notNull(),
});

export const vehicleVisits = pgTable("vehicle_visits", {
	vehicleId: integer("vehicle_id").primaryKey().generatedAlwaysAsIdentity({ name: "vehicle_visits_vehicle_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	entryTime: timestamp("entry_time", { withTimezone: true, mode: 'string' }).defaultNow(),
	exitTime: timestamp("exit_time", { withTimezone: true, mode: 'string' }).defaultNow(),
});
