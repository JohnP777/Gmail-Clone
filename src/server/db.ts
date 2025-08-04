import { ServiceRuntime } from "~/services";
import { Database } from "~/services/database";

/**
 * The database instance is created by the ServiceRuntime
 * and is available in the server context
 */
export const db = ServiceRuntime.runSync(Database);
