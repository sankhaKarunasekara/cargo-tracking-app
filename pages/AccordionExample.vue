<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion'
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">CusDec Ownership Confirmation</h1>
    
    <Accordion type="single" collapsible class="w-full">
      <!-- List of CusDecs -->
      <AccordionItem value="cusdec-list">
        <AccordionTrigger class="font-semibold">List of CusDecs</AccordionTrigger>
        <AccordionContent>
          <div class="overflow-x-auto">
            <table class="min-w-full border-collapse">
              <thead>
                <tr class="bg-gray-100">
                  <th class="p-2 border text-left">Actions</th>
                  <th class="p-2 border text-left">CusDec Number</th>
                  <th class="p-2 border text-left">Consignee</th>
                  <th class="p-2 border text-left">Declarant</th>
                  <th class="p-2 border text-left">Invoice Value</th>
                  <th class="p-2 border text-left">B/L Number</th>
                  <th class="p-2 border text-left">Country of Export</th>
                  <th class="p-2 border text-left">Number of Items</th>
                  <th class="p-2 border text-left">Terminal</th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover:bg-gray-50">
                  <td class="p-2 border">
                    <button class="text-blue-500 hover:text-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </td>
                  <td class="p-2 border">RQ-16785</td>
                  <td class="p-2 border">ABC Company (PVT) LTD</td>
                  <td class="p-2 border">ABC Freighters</td>
                  <td class="p-2 border">250,000 USD</td>
                  <td class="p-2 border">458789</td>
                  <td class="p-2 border">China</td>
                  <td class="p-2 border">03</td>
                  <td class="p-2 border">CCT</td>
                </tr>
                <tr class="hover:bg-gray-50">
                  <td class="p-2 border">
                    <button class="text-blue-500 hover:text-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </td>
                  <td class="p-2 border">RQ-16786</td>
                  <td class="p-2 border">WWW Company (PVT) LTD</td>
                  <td class="p-2 border">XYZ Importers</td>
                  <td class="p-2 border">180,000 USD</td>
                  <td class="p-2 border">789012</td>
                  <td class="p-2 border">China</td>
                  <td class="p-2 border">02</td>
                  <td class="p-2 border">CCT</td>
                </tr>
              </tbody>
            </table>
          </div>
        </AccordionContent>
      </AccordionItem>

      <!-- Ownership Confirmation -->
      <AccordionItem value="ownership-confirmation">
        <AccordionTrigger class="font-semibold">Ownership Confirmation</AccordionTrigger>
        <AccordionContent>
          <div class="mb-4">
            <div class="flex gap-2 mb-4">
              <div class="flex-1">
                <label class="block text-sm font-medium mb-1">Declarant</label>
                <select class="w-full p-2 border rounded">
                  <option>All</option>
                  <option>ABC Freighters</option>
                  <option>XYZ Importers</option>
                </select>
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium mb-1">Consignee</label>
                <select class="w-full p-2 border rounded">
                  <option>All</option>
                  <option>ABC Company (PVT) LTD</option>
                  <option>WWW Company (PVT) LTD</option>
                </select>
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium mb-1">B/L Number</label>
                <input type="text" class="w-full p-2 border rounded" placeholder="Search B/L Number">
              </div>
            </div>
            
            <div class="mb-4">
              <div class="relative">
                <input type="text" class="w-full p-2 pl-8 border rounded" placeholder="Search...">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-2 top-2.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div class="flex justify-end mb-4">
              <button class="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                </svg>
                Export
              </button>
            </div>
            
            <div class="overflow-x-auto">
              <table class="min-w-full border-collapse">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="p-2 border text-left">Actions</th>
                    <th class="p-2 border text-left">CusDec Number</th>
                    <th class="p-2 border text-left">Consignee</th>
                    <th class="p-2 border text-left">Declarant</th>
                    <th class="p-2 border text-left">Invoice Value</th>
                    <th class="p-2 border text-left">B/L Number</th>
                    <th class="p-2 border text-left">Country of Export</th>
                    <th class="p-2 border text-left">Number of Items</th>
                    <th class="p-2 border text-left">Terminal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="hover:bg-gray-50">
                    <td class="p-2 border">
                      <button class="text-blue-500 hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </td>
                    <td class="p-2 border">HMRC1090</td>
                    <td class="p-2 border">AA Company of China</td>
                    <td class="p-2 border">ABC Transport (PVT) LTD</td>
                    <td class="p-2 border">332,000.00</td>
                    <td class="p-2 border">MAB-22-0089-33</td>
                    <td class="p-2 border">China</td>
                    <td class="p-2 border">02</td>
                    <td class="p-2 border">CCT</td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td class="p-2 border">
                      <button class="text-blue-500 hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </td>
                    <td class="p-2 border">RC-35788</td>
                    <td class="p-2 border">WWW Company (PVT) LTD</td>
                    <td class="p-2 border">Acme Shipping</td>
                    <td class="p-2 border">548,000.00</td>
                    <td class="p-2 border">398377238</td>
                    <td class="p-2 border">India</td>
                    <td class="p-2 border">05</td>
                    <td class="p-2 border">BQ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <!-- CusDec Details -->
      <AccordionItem value="cusdec-details">
        <AccordionTrigger class="font-semibold">CusDec Details</AccordionTrigger>
        <AccordionContent>
          <div class="grid grid-cols-2 gap-6">
            <div class="bg-gray-50 p-4 rounded">
              <h3 class="font-semibold mb-3">Master Details</h3>
              
              <div class="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p class="text-sm text-gray-600">CONSIGNEE</p>
                  <p class="font-medium">AA Company of China</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">DECLARANT</p>
                  <p class="font-medium">ABC Freighters</p>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p class="text-sm text-gray-600">INVOICE VALUE</p>
                  <p class="font-medium">250,000 USD</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">B/L NUMBER</p>
                  <p class="font-medium">458789</p>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p class="text-sm text-gray-600">COUNTRY OF EXPORT</p>
                  <p class="font-medium">China</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">NO OF ITEMS</p>
                  <p class="font-medium">03</p>
                </div>
              </div>
              
              <div class="mb-6">
                <p class="text-sm text-gray-600">TERMINAL</p>
                <p class="font-medium">CCT</p>
              </div>
              
              <h3 class="font-semibold mb-3">Items</h3>
              <table class="w-full border-collapse">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="p-2 border text-left">#</th>
                    <th class="p-2 border text-left">HS CODE</th>
                    <th class="p-2 border text-left">DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="p-2 border">1</td>
                    <td class="p-2 border">12345678</td>
                    <td class="p-2 border">Counterfeit Neon</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="flex flex-col">
              <div class="flex space-x-2 mb-6">
                <button class="bg-blue-600 text-white px-6 py-2 rounded">Back</button>
                <button class="bg-red-600 text-white px-6 py-2 rounded">I am not the Owner</button>
                <button class="bg-green-600 text-white px-6 py-2 rounded">I am the Owner</button>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template> 