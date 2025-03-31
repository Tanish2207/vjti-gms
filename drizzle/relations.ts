import { relations } from "drizzle-orm/relations";
import { visitors, humanVisits, vehicleVisits } from "./schema";

export const humanVisitsRelations = relations(humanVisits, ({one}) => ({
	visitor: one(visitors, {
		fields: [humanVisits.visitorId],
		references: [visitors.visitorId]
	}),
}));

export const visitorsRelations = relations(visitors, ({many}) => ({
	humanVisits: many(humanVisits),
	vehicleVisits: many(vehicleVisits),
}));

export const vehicleVisitsRelations = relations(vehicleVisits, ({one}) => ({
	visitor: one(visitors, {
		fields: [vehicleVisits.visitorId],
		references: [visitors.visitorId]
	}),
}));