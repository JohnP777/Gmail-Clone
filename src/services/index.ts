import { Layer, ManagedRuntime } from "effect";

import { PostService } from "./post";

/**
 * Main service layer that composes all application services
 * This creates the dependency graph for the entire application
 */
const MainLayer = Layer.mergeAll(PostService.Default);

/**
 * Runtime for the application
 * This can be used to run Effects with all services available
 */
export const ServiceRuntime = ManagedRuntime.make(MainLayer);

/**
 * Test layer for unit testing
 * Allows injection of mock services
 */
// export const createTestLayer = (
//   mockDb?: Parameters<typeof Database.Test>[0],
//   mockPostService?: Parameters<typeof PostService.Test>[0]
// ) => {
//   const layers = [];

//   if (mockDb) {
//     layers.push(Database.Test(mockDb));
//   }

//   if (mockPostService) {
//     layers.push(PostService.Test(mockPostService));
//   }

//   return layers.length > 0
//     ? layers.length === 1
//       ? layers[0]!
//       : Layer.mergeAll(
//           ...(layers as unknown as [
//             Layer.Layer<never, never, never>,
//             Layer.Layer<never, never, never>,
//             ...Layer.Layer<never, never, never>[],
//           ])
//         )
//     : Layer.empty;
// };
