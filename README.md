# deepflatten
javascript deep flatten object

Just a simple javascript function which does deep flattening of javascript object/array. 
There are quite a few libraries out there say lodash/immuntable etc that has this though most requires the full npm install etc.
Beside, this one is specifically written in very old javascript spec(no map/reduce or any ES2015+ feature requirments) so should be a simple copy and paste.
It is written to be as efficient as possible(no recursion as even if it can be written in TCO friendly style, not all runtime support it) nor it requires heavy array manipulation(all are O(1))
Should be easy to change to generator too.
The default handles only pure object({}) or array([]) but has option to handle other custom object and it can traverse either depth first or breath first
